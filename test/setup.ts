// tslint:disable
import "aurelia-loader-webpack";
import "aurelia-polyfills";
import { initialize } from "aurelia-pal-browser";
// tslint:enable

initialize();
Error.stackTraceLimit = Infinity;

const testContext: any = (require as any).context("./unit", true, /\.spec\.ts$/);
testContext.keys().forEach(testContext);
