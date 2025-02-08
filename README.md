### Install your own app inside my system:

To install a static build of html, css and js: (skip this if you made your project using vite, I've made a script for you)

1. rename your main html file "index.html" to [Project_Name].html
2. make a folder named [Project_Name]\_assets at the same level
3. inside it, place all your assets such as .js file, .css file, audio files etc..

Now you should be having :

- [Project_Name]\_assets folder
  and
- [Project_Name].html
  at the same level

4. Place these two inside the public directory of Sunu OS (this project)

5. Go inside your [Project_Name].html and  
   correct the two links in your [Project_Name].html for javascript and css files
   by replacing them with their current relative paths (inside the [Project_Name]\_assets folder)

- For example, Change
  `<script> src = "old_path/12345.js"</script>`
  to
  `<script> src="/[Project_Name]_assets/12345.js" </script>`

- Add your entry inside "the app_list.json" in my project.
  That's it, your app has been installed ....

(Please check out an already added project inside public to get the analogy if you face problems)

### If you have made your project using vite:

I've made a build script to make it easy for you:

- You have to copy my "#BUILD_FOR_SUNU.cjs" inside your project's root.
- Then just run :

```
npm run build && #BUILD_FOR_SUNU.cjs [YOUR_PROJECT_NAME]
```

This will prepare the dist, then my script will create a new folder named: "#SUNU_OS_dist"

Now inside the #SUNU_OS_dist folder, you should be having :

- [Project_Name]\_assets folder
  ,
- [Project_Name].html
  ,
- [Project_Name].(your image format for logo)
  at the same level

- Copy all these and paste into the public directory of my project.
  ([Project_Name.html] should be the direct child of "public/" directory)

- Add your entry inside "the app_list.json" in my project.
  That's it, your app has been installed ....

(Please check out an already added project inside public to get the analogy if you face problems)
