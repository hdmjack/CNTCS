# CNTCS

## Quickstart

Install [Yarn](https://yarnpkg.com/en/docs/install).

In the project directory:

`yarn`

`yarn start`

## Methodology

I opted for a modern tech stack (Babel, React, Async/Await) with minimal dependencies, favoring stable libs over bleeding-edge ones. I chose
Ant Design as a UI framework as I find it strikes a nice balance between out-of-the-box style and functionality, and configurability. This lead
me to choose Less for styling (Ant uses it internally).

I opted to not use TypeScript and GraphQL simply becuase I am not sufficiently fluent in them that they would have sped up development for me.
I haven't setup a TS or GraphQL project from scratch before, and I didn't want to waste extra time on configuration. I considered using Flow, but
considering the size of the project it didn't seem necessary.

The project was scaffoled with `create-react-app` with some small modifications to the webpack config to get LESS working.

In my API design, I assumed a non-nullable, string-only, schema for the contacts to simplify rendering logic (no null/undefined checks, no
type coercions). Admittedly this is not reflective of most API out in the wild, but it was fun to write against!

The "API" module is a dummy Javascript class that returns promises that resolves after (constrained) random timeouts, to make the application "feel"
like it's talking to a real remote backend.

It goes without saying that with no real backend, user data will not persist across page loads. Every loads of the app yields a fresh batch of
random contacts to manipulate.

The App is treating the backend mostly as storage, with all the actual list and value manipulation happening client-side. This way
the interface is snappy, and the user isn't waiting on API calls to complete before they can continute using their application. It also avoids awkward
state synchronization errors.

## To Be Inproved

There is no error handling on the API endpoints. This is really a must-have, but I would rather deliver something on-time, even if it is lacking
robust error handling.

Due to time constraints, tests are essentially non-existant. I did make a point to write it with an eye for reusability, with minimal state and
branching logic, so writing tests shouldn't be too painful.

There will definitely be performance issues while editing fields on cards if the user has a lot of contacts, due to re-renders.
This is a problem that comes up a lot in React applications and requires sometimes painful work arounds and optimisations.

The Ant Design Less variables are stored directly in the webpack config file. This is a pattern supported by Ant, but it's far from elegant,
trying to load the variables from a separate less file proved less straight forward than I had hoped, so for the sake of expediency I left them as-is.

There is no field validation, though it's debatable as to whether it's necessary here. One could argues that the user can store whatever they want in their
contact fields.

There is no way to add/edit contact images.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
