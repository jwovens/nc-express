# nc-express
Playground for representing netcdf file via node express web app

## Routes
```
/                                 // list files on directory path
/:file                            // contents of :file (found on dir path)
/:file/head(er)?(s)?              // header information of :file
/:file/head(er)?(s)?.:header      // specific :header information of :file
/:file/var(iable)?(s)?            // variables metadata of :file
/:file/var(iable)?(s)?/:variable  // data associated with :variable
```