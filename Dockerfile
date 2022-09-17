# lightweight node image
FROM node:alpine

# workdir of the container
WORKDIR /usr/src/app

# copying the package.json and package-lock.json
COPY package*.json .

# instead of npm install: this reads fron the package-lock.json for installing dependency
RUN npm ci

# copying the entire directory
COPY . .

# running the nodejs app
# CMD [ "npm", "start" ]
# running the nodejs app with nodemon
CMD [ "npm", "run", "dev" ]



