
# pull base image
FROM node:14

ARG NODE_ENV=development

EXPOSE 19000
EXPOSE 19001
EXPOSE 19002
EXPOSE 19006

# install global packages
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH /home/node/.npm-global/bin:$PATH
RUN npm install -g expo-cli

# install dependencies first, in a different location for easier app bind mounting for local development
# due to default /opt permissions we have to create the dir with root and change perms
RUN mkdir /opt/GUINativeChat
WORKDIR /opt/GUINativeChat
ENV PATH /opt/GUINativeChat/.bin:$PATH
COPY ./package.json ./package-lock.json ./
RUN npm install

# copy in our source code last, as it changes the most
WORKDIR /opt/GUINativeChat/app
# for development, we bind mount volumes; comment out for production
#COPY . .

run npx expo install @expo/webpack-config@^18.0.1

CMD ["npx", "expo", "start", "--web"]