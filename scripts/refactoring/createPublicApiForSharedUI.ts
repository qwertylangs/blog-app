import { Project } from 'ts-morph';
import path from 'path';

const project = new Project();

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();
const sharedUiPath = path.join(__dirname, '..', '..', 'src', 'shared', 'ui');
const sharedUiDirectory = project.getDirectory(sharedUiPath);
const componentDirs = sharedUiDirectory?.getDirectories()

componentDirs?.forEach((directory) => {
  const indexPath = path.join(directory.getPath(), 'index.ts');
  const indexFile = project.getSourceFile(indexPath);

  if (!indexFile) {
    const code = `export * from './${directory.getBaseName()}'`;
    const file = directory.createSourceFile(indexPath, code, {overwrite: true});
    file.save();
  }
}
)


function isAbsolute(value: string) {
  const layers = ['app', 'widgets', 'pages', 'features', 'entities', 'shared'];
  return layers.some((layer) => value.startsWith(layer));
}

files.forEach((file) => {
  const importDeclarations = file.getImportDeclarations();

  importDeclarations.forEach((importDeclaration) => {
    const moduleSpecifier = importDeclaration.getModuleSpecifierValue();
    const valueWithoutAlias = moduleSpecifier.replace('@/', '');

    const segments = valueWithoutAlias.split('/');
    const isSharedUi = segments[0] === 'shared' && segments[1] === 'ui';;

    if (isAbsolute(valueWithoutAlias) && isSharedUi) {
      const sliced = segments.slice(0, 3).join('/')
      importDeclaration.setModuleSpecifier(`@/${sliced}`);
    }
  });
});

project.save();
