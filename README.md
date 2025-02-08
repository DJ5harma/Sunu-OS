### Install your own app inside it:

I've made a build script:

NOTE: It works according to how vite makes react distributables, so it may not work in other configurations

- You have download/copy "build".
- Then just run :

```
npm run build && #BUILD_FOR_SUNU.cjs [YOUR_PROJECT_NAME]
```

This will prepare the dist, then my script will create a new folder named: "#SUNU_OS_dist"

- Then copy all the contents inside "#SUNU_OS_dist" into the public directory of my project.
- Add your entry inside "the app_list.json" in my project.
  That's it, your app has been installed ....
