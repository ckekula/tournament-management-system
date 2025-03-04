import { definePreset } from '@primeng/themes';
import Lara from '@primeng/themes/lara';

export const CustomePreset = definePreset(Lara, {
    semantic: {
        primary: {
            50: '{sky.50}',
            100: '{sky.100}',
            200: '{sky.200}',
            300: '{sky.300}',
            400: '{sky.400}',
            500: '{sky.500}',
            600: '{sky.600}',
            700: '{sky.700}',
            800: '{sky.800}',
            900: '{sky.900}',
            950: '{sky.950}'
        },
        colorScheme: {
            light: {
                primary: {
                    color: '{sky.600}',   // Slightly darker blue for contrast
                    inverseColor: '#ffffff',
                    hoverColor: '{sky.500}',
                    activeColor: '{sky.700}'
                },
                highlight: {
                    background: '{sky.500}',
                    focusBackground: '{sky.400}',
                    color: '#ffffff',
                    focusColor: '#ffffff'
                }
            },
            dark: {
                primary: {
                    color: '{sky.200}',
                    inverseColor: '{sky.950}',
                    hoverColor: '{sky.300}',
                    activeColor: '{sky.400}'
                },
                highlight: {
                    background: 'rgba(125, 211, 252, .16)',  // Light sky blue with transparency
                    focusBackground: 'rgba(125, 211, 252, .24)',
                    color: 'rgba(255,255,255,.87)',
                    focusColor: 'rgba(255,255,255,.87)'
                }
            }
        }
    }
});
