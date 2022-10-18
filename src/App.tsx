import { Provider } from "react-redux"
import { store } from "./app/store"
import AppRouter from "./router/AppRouter"
import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  :root {
    --transition: all 0.3s linear;
    --radius:5px;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.5;
    font-size: 0.875rem;
  }

  img{
    display: block;
    width: 100%;
  }
`

const Container = styled.div`
  width: 85vw;
  margin: 0 auto;
  max-width: 1170px;
  @media screen and (min-width: 992px) {
    width: 95vw;
  }
`

const App = () => {
    return (
        <Provider store={store}>
            <Container>
                <GlobalStyles/>
                <AppRouter/>
            </Container>
        </Provider>
    )
}

export default App