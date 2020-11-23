import { addConfig } from '../../../config';

export const addFonts: addConfig = (config, plugins): void => {
  plugins.push({
    resolve: 'gatsby-plugin-google-fonts',
    options: {
      fonts: ['Roboto:300,400,500,700', 'Poppins:300,400,500,600'],
    },
  });
};
