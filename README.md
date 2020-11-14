# giphy-browser

A simple GIF browser using the Giphy API, built in React.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Design Decisions

* I'm relatively new to React, having mostly worked in the Ember framework, so I tried to use well-worn patterns and libraries as much as possible. I used create-react-app as this seems to be the simplest, most common approach.
* I went with a fixed-height flexbox approach for the grid of GIFs. Since GIFs are of many different aspect ratios, there is no way to display them on a regular grid without truncating them. While it is possible to use each GIF's unadulterated aspect ratio and fill each row out to 100% width, this can result in disproportionately large or small thumbnails. I opted for a simpler approach, and I quite like the visual contrast of the fixed heights with the staggered horizontal positioning.
* I wanted to prevent reflows when the GIF images are loading. To do this, I used the width and height provided from the API to make a placeholder image. 

## Ways to Improve and Expand

There are several ways this project could be improved with more time:
* Add linting
* Decouple the API calls from the components
* Add a store for preserving the GiphyBrowser state (this could be Redux). This would enable the back button from GifDetail to GiphyBrowser to preserve the scroll position and results set. The current implementation has to re-load all state when the back button is pressed.
* If the last loaded row still has space for at least one more thumbnail, loading new content causes a jump in the positioning of the already loaded thumbnails in the row. This could be solved by limiting the displayed results to only full rows when there are still unloaded results.
* Implement loading and error states
* Detect slow connections and use still or lower res thumbnails

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

