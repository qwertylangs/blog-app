import { Project } from 'ts-morph';

const project = new Project();

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

function isAbsolute(value: string) {
  const layers = ['app', 'widgets', 'pages', 'features', 'entities', 'shared'];
  return layers.some((layer) => value.startsWith(layer));
}

files.forEach((file) => {
  const importDeclarations = file.getImportDeclarations();

  importDeclarations.forEach((importDeclaration) => {
    const moduleSpecifier = importDeclaration.getModuleSpecifierValue();
    if (isAbsolute(moduleSpecifier)) {
      importDeclaration.setModuleSpecifier(`@/${moduleSpecifier}`);
    }
  });
});

project.save();
