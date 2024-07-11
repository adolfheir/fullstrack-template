"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aliases = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = require("fs-extra");
const module_alias_1 = __importDefault(require("module-alias"));
class Aliases {
    static async config() {
        // this.configInternalPackages();
        this.configDirectories();
    }
    static configInternalPackages() {
        const tsConfig = (0, fs_extra_1.readJsonSync)('tsconfig.json');
        const aliases = tsConfig.references.map(({ path }) => {
            const [_, internalPackage] = path.split('@');
            const packageName = `@${internalPackage}`.replace('/tsconfig.json', '');
            const packageEntry = `${packageName}/dist/index.js`;
            return { [packageName]: packageEntry };
        });
        const flatAliases = Object.assign({}, ...aliases);
        module_alias_1.default.addAliases(flatAliases);
    }
    static configDirectories() {
        const directories = (0, fs_extra_1.readdirSync)('./src', { withFileTypes: true })
            .filter((directory) => directory.isDirectory())
            .map(({ name }) => name);
        const aliases = directories.map((directory) => ({ [directory]: path_1.default.resolve(__dirname, directory) }));
        const flatAliases = Object.assign({}, ...aliases);
        console.log('aliases', aliases, flatAliases);
        module_alias_1.default.addAliases(flatAliases);
    }
}
exports.Aliases = Aliases;
Aliases.config();
