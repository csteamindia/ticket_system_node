FROM node:18-alpine
WORKDIR /
COPY . .
EXPOSE 3000
CMD ["npm", "start"]