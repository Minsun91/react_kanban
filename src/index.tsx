//html 템플렛 및 js 컴포넌트를 조합하여 렌더링하고 실제로 표시한다. 

import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";
import App from "./App";
import {RecoilRoot} from "recoil";

// const rootElement = document.getElementById('root');
// if (!rootElement) throw new Error('Failed to find the root element');
// const root = ReactDOM.createRoot(rootElement); -> 이거 v5일때인가? 그러면 root.render로 아래도 바뀌어야함

const queryClient = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
        <QueryClientProvider client={queryClient}>
            {/* <ThemeProvider theme={lighttheme}> */}
                <App />
            {/* </ThemeProvider> */}
        </QueryClientProvider>
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById("root")
);
