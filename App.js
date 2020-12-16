import 'react-native-gesture-handler';
import NavigationStack from './NavigationStack';
import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
//console.disableYellowBox = true;
import { default as themeJson } from './custom-theme.json'; // <-- Import app theme
import { default as mapping } from './mapping.json';
import { ThemeContext } from './themeContext';
import { AuthContextWrapper } from './AuthContext'
export default  () => {
    
    
    const [theme, setTheme] = React.useState('light');

    const toggleTheme = () => {
      const nextTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(nextTheme);
    };
  

    //customMapping={mapping}  goes in application provider
        return (
            <>
            <IconRegistry icons={EvaIconsPack} />
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <ApplicationProvider  {...eva} theme={{...eva[theme], ...themeJson}}>
            <AuthContextWrapper>
                <NavigationStack/>
            </AuthContextWrapper>
            </ApplicationProvider>
            </ThemeContext.Provider>
            </>
        );
    

}
