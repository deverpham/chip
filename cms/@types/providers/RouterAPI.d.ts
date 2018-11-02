declare function RouterAPIDeclaration: new (slash?: string) => RouterAPIInstrance
interface RouterAPIInstrance {
    name: string;
}

/*~ Write your module's methods and properties in this class */
declare class MyClass {
    constructor(someParam?: string)
    new(): RouterAPIInstrance;

    someProperty: string[];

    myMethod(opts: MyClass.MyClassMethodOptions): number;
}

/*~ If you want to expose types from your module as well, you can
 *~ place them in this block.
 */
declare namespace MyClass {
    export interface MyClassMethodOptions {
        width?: number;
        height?: number;
    }
}