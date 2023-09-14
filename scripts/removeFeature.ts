import { Node, Project, SyntaxKind } from 'ts-morph';

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

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();


const isToggleFunction = (node: Node) => {
  let isToggleFeatures = false;
  node.forEachChild((child) => {
    if(child.asKind(SyntaxKind.Identifier) && child.getText() === 'toggleFeatures') {
      isToggleFeatures = true;
    }
  })
  return isToggleFeatures
}

files.forEach((file) => {
  file.forEachDescendant((node) => {
    if(node.asKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
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
  })
});

project.save();
