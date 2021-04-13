import 'react-native-gesture-handler';
import NavigationStack from './NavigationStack';
import React, { useEffect } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
//console.disableYellowBox = true;
import { default as themeJson } from './custom-theme.json'; // <-- Import app theme
import { default as mapping } from './mapping.json';
import { ThemeContext } from './themeContext';
import { AuthContextWrapper } from './AuthContext'
import { TimerSettingsContextWrapper } from './TimerSettingsContext'


export default  () => {
    
    
    const [theme, setTheme] = React.useState('light');

    //customMapping={mapping}  goes in application provider
        return (
            <>
            <IconRegistry icons={EvaIconsPack} />
            <ThemeContext.Provider value={{ theme }}>
            <ApplicationProvider customMapping={mapping} {...eva} theme={{...eva[theme], ...themeJson}}>
            <AuthContextWrapper>
            <TimerSettingsContextWrapper>
                <NavigationStack/>
            </TimerSettingsContextWrapper>
            </AuthContextWrapper>
            </ApplicationProvider>
            </ThemeContext.Provider>
            </>
        );
    

}
