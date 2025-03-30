# AJC Map Application
Interactive map displaying locations of interest for members of the Austin Japan Community.

Application URL : https://sumearthb.github.io/ajc-austin-map/

**************************************************************
### AJC IT Members Checklist

⬜Accept Github repository invite.

⬜Create AJC Google Maps API Key.

⬜Update source code to use the new API key.

⬜Deploy changes to ensure the application uses the new API key.

⬜Add link to the map application on AJC website.


For guidance on modifying the source code and transitioning control of the AJC Map Application to the AJC team, 
please refer to the Technical Document included in the repository. Detailed action items are available on Page 7.

****************************************************************

## Setting Up the Repo
More detailed instructions can be found in the Technical Document starting on Page 8.

git clone <paste the copied URL> .

cd map

./setup.sh

****************************************************************

## Redeploying the Application
Any time you want to update the application URL with new changes you will need to push and redeploy.
More detailed instructions can be found in the Technical Document starting on Page 12.

git add .

git commit -m "Pushing new changes"

git push

npm run build

npm run deploy


