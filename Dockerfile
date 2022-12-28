from node:19

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

ARG PORT=8080

EXPOSE ${PORT}

CMD ["npm", "start"]