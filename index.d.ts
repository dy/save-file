export = save;

declare function save (data: ArrayBuffer, filename: string, done: function) : Promise

declare function save (data: Buffer, filename: string, done: function) : Promise

declare function save (data: TypedArray, filename: string, done: function) : Promise

declare function save (data: Array, filename: string, done: function) : Promise

declare function save (data: File, filename: string, done: function) : Promise

declare function save (data: Blob, filename: string, done: function) : Promise

declare function save (data: string, filename: string, done: function) : Promise
