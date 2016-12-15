# Make a simple screenshots of website
Just a simple API to make a screenshots of websites.

# Usage
Run in command line:
```
node index.js
```

# Routes
Here is the list of basic routes

## List of screenshots (/list)
List of all done screenshots
```
/list
```

## List of screenshots (/screenshot)
Make screenshot
```
/list?url=your_url
```

Example
```
localhost:8888/list?url=fedojo.com
```


## Projects


### List projects
```
/api/project/list
```

### Create project
```
/api/project/create?name=First&createdBy=Piotr
```