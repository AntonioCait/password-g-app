
import './App.module.css';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import {Checkbox} from "@mui/material";
//form
import {TextField} from "@mui/material";
import {FormControlLabel} from "@mui/material";
import {FormGroup} from "@mui/material";
import {FormLabel} from "@mui/material";
import {FormControl} from "@mui/material";
import {Radio} from "@mui/material";
import React, {useState, useRef} from "react";
import {Slider} from "@mui/material";
//icon copy to cilipboard material ui
import {FileCopy} from "@mui/icons-material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
//colors
import {blueGrey} from "@mui/material/colors";
import {green} from "@mui/material/colors";
import {red} from "@mui/material/colors";
import {deepPurple} from "@mui/material/colors";
import {grey} from "@mui/material/colors";
import {Box} from "@mui/material";

//import css module
import styles from './App.module.css';


function App() {
    const [passLength, setPassLength] = useState<number>(14);
    const [upperCase, setUpperCase] = useState<boolean>(true);
    const [lowerCase, setLowerCase] = useState<boolean>(true);
    const [numbers, setNumbers] = useState<boolean>(true);
    const [symbols, setSymbols] = useState<boolean>(true);
    const [password, setPassword] = useState<string>('');

    //check if the user has selected at least one option
    const [error, setError] = useState<boolean>(false);

    //check if copy to clipboard is clicked
    const [copy, setCopy] = useState<boolean>(false);




    //copy to clipboard
    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        setCopy(true);
    }

    const handlePassLength = (event: unknown, newValue: number | number[]) => {
        setPassLength(newValue as number);
    }

    const handleUpperCase = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUpperCase(event.target.checked);
    }

    const handleLowerCase = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLowerCase(event.target.checked);
    }

    const handleNumbers = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumbers(event.target.checked);
    }

    const handleSymbols = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSymbols(event.target.checked);
    }

    const handleGeneratePassword = () => {
        if (!upperCase && !lowerCase && !numbers && !symbols) {
            setError(true);
            return;
        } else {
            setError(false);
        }

        let charSet: string = '';
        if (upperCase) {
            charSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }
        if (lowerCase) {
            charSet += 'abcdefghijklmnopqrstuvwxyz';
        }
        if (numbers) {
            charSet += '0123456789';
        }
        if (symbols) {
            charSet += '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
        }

        let password: string = '';
        for (let i = 0; i < passLength; i++) {
            const randomPoz = Math.floor(Math.random() * charSet.length);
            password += charSet.substring(randomPoz, randomPoz + 1);
        }
        setPassword(password);
        setCopy(false);
    }

  return (
    <div
        style={{
            backgroundColor: grey["A100"],
            height: "100vh",
            padding: "20px",
        }}
        className="App">
      <header
          style={{
              padding: 20,
          }}
          className="App-header">
        <Typography
            sx={{ fontSize: 38,
                fontFamily: "Maven Pro",
                fontWeight: 700,
                color: deepPurple["A700"],}}
            //center
            align="center"
            variant="h1" component="h2" gutterBottom>
            Password Generator
        </Typography>
      </header>
      <section className={styles.sectionContainer}>
        <main className={styles.mainContainer}>
            <Typography
                sx={{ fontSize: 24,
                fontFamily: "Maven Pro",
                    color: blueGrey[900],
                }}
                variant="h2" component="h2" gutterBottom>
                Generate a password
            </Typography>
            <FormControl
                sx={{ width: "100%",}}
            >
                <FormLabel
                    sx={{ fontSize: 16,
                        fontFamily: "Maven Pro",
                        color: blueGrey[900],}}
                    component="legend">Password length</FormLabel>
                <Slider
                    sx={{ width: "100%",
                        color: deepPurple["A700"],}}
                    value={passLength}
                    onChange={handlePassLength}
                    valueLabelDisplay="auto"
                    aria-labelledby="non-linear-slider"
                    min={14}
                    max={30}
                />
            </FormControl>
            <FormControl
                sx={{ width: "100%",
                    fontFamily: "Maven Pro",
                    fontSize: 14,
                    color: blueGrey[900],
                    }}
            >
                <FormLabel
                    sx={{ fontSize: 16,
                        fontFamily: "Maven Pro",
                        color: blueGrey[900],}}
                    component="legend">Include</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox sx={{
                            color: deepPurple["A700"],
                            '&.Mui-checked': {
                                color: deepPurple["A700"],
                            }
                        }} checked={upperCase} onChange={handleUpperCase} />}
                        label="Uppercase"
                    />
                    <FormControlLabel
                        control={<Checkbox sx={{
                            color: deepPurple["A700"],
                            '&.Mui-checked': {
                                color: deepPurple["A700"],
                            }
                        }} checked={lowerCase} onChange={handleLowerCase} />}
                        label="Lowercase"
                    />
                    <FormControlLabel
                        control={<Checkbox sx={{
                            color: deepPurple["A700"],
                            '&.Mui-checked': {
                                color: deepPurple["A700"],
                            }
                        }} checked={numbers} onChange={handleNumbers} />}
                        label="Numbers"
                    />
                    <FormControlLabel
                        control={<Checkbox sx={{
                            color: deepPurple["A700"],
                            '&.Mui-checked': {
                                color: deepPurple["A700"],
                            }
                        }} checked={symbols} onChange={handleSymbols} />}
                        label="Symbols"
                    />
                </FormGroup>
            </FormControl>
            <Button
                sx={{ width: "100%",
                    fontFamily: "Maven Pro",
                    backgroundColor: deepPurple["A400"],
                    //when clicked
                    '&:hover': {
                        backgroundColor: deepPurple["A700"],
                    }
                }}
                variant="contained"
                onClick={handleGeneratePassword}
            >
                Generate Password
            </Button>
            {
                error && <Typography
                    sx={{ fontSize: 16,
                        marginTop: 1,
                        fontFamily: "Maven Pro",}}
                    color="error"
                    variant="h2" component="h2" gutterBottom>
                    Please select at least one option
                </Typography>
            }
            <TextField
                sx={{ width: "100%",
                    marginTop: 5,
                    fontFamily: "Maven Pro",
                    color: blueGrey[900],
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: deepPurple["A700"],
                        }
                    }
                }}
                id="outlined-basic"
                label="Password"
                variant="outlined"
                value={password}
            />
            <Button
                sx={{ width: "100%",
                    marginTop: 1,
                    backgroundColor: deepPurple["A700"],
                    '&:hover': {
                        backgroundColor: deepPurple["A400"],
                    }
                }}
                variant="contained"
                onClick={copyToClipboard}
            >
                <ContentCopyIcon />
            </Button>
            {
                copy && <Typography
                    sx={{ fontSize: 16,
                        marginTop: 1,
                        fontFamily: "Maven Pro",
                        color: blueGrey[900],}}
                    variant="h2" component="h2" gutterBottom>
                    Copied to clipboard
                </Typography>
            }

            </main>
        </section>
    </div>
  );
}

export default App;
