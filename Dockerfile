FROM node:21

# Create app directory
WORKDIR /ivanl/src/app

# Install app depemdencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 8000
CMD ["node", "dist/main"]