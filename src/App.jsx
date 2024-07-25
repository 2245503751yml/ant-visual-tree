import React, { useState } from "react";
import TreeSvg from "./components/treeSvg/TreeSvg"
import { TextField, ThemeProvider, createTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CssBaseline from '@mui/material/CssBaseline';
import { useTranslation } from 'react-i18next';
import IconButton from "@mui/material/IconButton";
import "./App.css"

// 定义光明主题
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // 主色
    },
    secondary: {
      main: '#dc004e', // 辅色
    },
    background: {
      default: '#ffffff', // 背景色
      paper: '#f5f5f5', // 纸张背景色
    },
    text: {
      primary: '#000000', // 主文本色
      secondary: '#555555', // 次文本色
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // 主色
    },
    secondary: {
      main: '#f48fb1', // 辅色
    },
    background: {
      default: '#121212', // 背景色
      paper: '#1e1e1e', // 纸张背景色
    },
    text: {
      primary: '#ffffff', // 主文本色
      secondary: '#b0bec5', // 次文本色
    },
  },
});

function App() {
  const { t } = useTranslation(); // 使用 useTranslation 钩子
  const [theme, setTheme] = useState(darkTheme);
  let defualtSerialTreeString = localStorage.getItem("serialTreeString");
  if (!defualtSerialTreeString) {
    defualtSerialTreeString = "[1,2,3,4,5,null,7,8]";
  }
  const [serialTreeString, setSerialTreeString] = useState(defualtSerialTreeString);

  const handleInputChange = (event) => {
    setSerialTreeString(event.target.value);
    localStorage.setItem("serialTreeString", event.target.value)
  };
  const handleThemeChange = () => {
    setTheme((prevTheme) =>
      prevTheme.palette.mode === 'dark' ? lightTheme : darkTheme
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <TreeSvg data={serialTreeString}/>
        <div className="overlay">
          {false && <button className="button">按钮</button>}
        </div>
        <div className="top-right">
          <TextField 
            className="serialInput"
            id="filled-basic"
            label={t('label')}
            variant="filled"
            helperText={t('helperText')}
            defaultValue={serialTreeString}
            onChange={handleInputChange}
            multiline
          />
          <IconButton
              sx={{ ml: 1 }}
              onClick={handleThemeChange}
              color="inherit"
            >
              {theme.palette.mode === 'dark' ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
