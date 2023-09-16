import { JsxAttribute, Node, Project, SyntaxKind } from 'ts-morph';

const removedFeatureName = process.argv[2];
const featureState = process.argv[3];

if (!removedFeatureName || !featureState) {
  console.log('Usage: npm run removeFeature <featureName> <featureState>');
  process.exit(1);
}

if (featureState !== 'on' && featureState !== 'off') {
  console.log('Usage: npm run removeFeature <featureName> <featureState>');
  console.log('featureState should be on or off');
  process.exit(1);
}


const project = new Project();
// project.addSourceFilesAtPaths('src/**/ArticleDetailsPage.tsx');
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

const toggleFunctionName = 'toggleFeatures';
const toggleComponentName = 'ToggleFeatures';


const isToggleFunction = (node: Node) => {
  let isToggleFeatures = false;
  node.forEachChild((child) => {
    if(child.asKind(SyntaxKind.Identifier) && child.getText() === toggleFunctionName) {
      isToggleFeatures = true;
    }
  })
  return isToggleFeatures
}

const replaceToggleFunction = (node: Node) => {
  const objOptions = node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);
  const offFuncProperty =  objOptions?.getProperty('off');
  const onFuncProperty =  objOptions?.getProperty('on');
  const featureNameProperty = objOptions?.getProperty('name')

  const onFunction = onFuncProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
  const offFunction = offFuncProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
  const featureName = featureNameProperty?.getFirstDescendantByKind(SyntaxKind.StringLiteral)?.getText().slice(1, -1);

  if (featureName !== removedFeatureName) {
    return;
  }
  if (featureState === 'on') {
    node.replaceWithText(onFunction?.getBody().getText() ?? '');
  }
  if (featureState === 'off') {
    node.replaceWithText(offFunction?.getBody().getText() ?? '');
  }
}

const isToggleComponent = (node: Node) => {
  const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier);
  return identifier?.getText() === toggleComponentName;
}

const getAttributeByName = (
  jsxAttributes: JsxAttribute[],
  attributeName: string,
) => {
  return jsxAttributes.find((attribute) => attribute.getNameNode().getText() === attributeName)
}

const getReplacedComponent = ( attribute: JsxAttribute | undefined) => {
  const value = attribute?.getFirstDescendantByKind(SyntaxKind.JsxExpression)?.getExpression()?.getText();
  if (value?.startsWith('(')) {
    return value.slice(1, -1);
  }
  return value;
}

const replaceToggleComponent = (node: Node) => {
  const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);
  
  const onAttribute = getAttributeByName(attributes, 'on');
  const offAttribute = getAttributeByName(attributes, 'off');
  const nameAttribute = getAttributeByName(attributes, 'name');

  const featureName = nameAttribute?.getInitializer()?.getText().slice(1, -1);
  
  if (featureName !== removedFeatureName) {
    return;
  }

  const onValue = getReplacedComponent(onAttribute);
  const offValue = getReplacedComponent(offAttribute);

  if (featureState === 'on') {
    node.replaceWithText(onValue ?? '');
  }
  if (featureState === 'off') {
    node.replaceWithText(offValue ?? '');
  }
}

files.forEach((file) => {
  file.forEachDescendant((node) => {
    if(node.asKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
      replaceToggleFunction(node)
    } else if(node.asKind(SyntaxKind.JsxSelfClosingElement) && isToggleComponent(node)) {
      replaceToggleComponent(node)
    }
    
  })
});

project.save();
