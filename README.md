# @hello3/react

React package that contains functionality that is needed to easily setup authentication with Hello3. Simply wrap your app with the `Hello3Provider` and use the `useHello3` hook to get started.

## Example with Create React App

```tsx
// index.tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Hello3Provider } from '@hello3/react'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Hello3Provider>
    <App />
  </Hello3Provider>
)
```

```tsx
// App.tsx
import { useHello3 } from '@hello3/react'

function App() {
  const { user, showSignInModal, clearSession } = useHello3()

  return (
    <div>
      {user ? (
        <div>
          <p>Hello, ${user.address}</p>
          <button onClick={clearSession}>Sign out</button>
        </div>
      ) : (
        <div>
          <p>Please sign in</p>
          <button onClick={showSignInModal}>Sign in with Hello3</button>
        </div>
      )}
    </div>
  )
}
```

## Full API

```tsx
// Props that can be passed to Hello3Provider
type ProviderProps = {
  domain?: string
  connector?: string
  connectorProtocol?: string
  storageKey?: string
  onSignInError?: (error: Error) => void
}
```

```tsx
// Values returned from the useHello3 hook
import { useHello3 } from '@hello3/react'

function App() {
  const {
    isShowingSignInModal,
    showSignInModal,
    hideSignInModal,
    clearSession,
    user: { did, address, token },
  } = useHello3()

  // ...
}
```

## Development

To install the local dependency in a test react project:

```
$ cd hello3-react
$ npm i && npm run build:dev
$ cd ../hello3-rest-react-app
$ npm i ../hello3-react
```

From there on the lib is linked, and when you change something in hello3-react, run again `npm run build:dev` to hot reload the package, or simply `npm run build:esm` for faster buildtime.

More documentation on integrating Hello3 is available on the docs website.
