FROM picklete/picklete_env
COPY ./ /nodjsSample
WORKDIR /nodjsSample

RUN /bin/bash -l -c 'npm i'
RUN /bin/bash -l -c 'node_modules/.bin/grunt prod'

ENV PORT "1337"
ENV NODE_ENV "production"
ENV DOMAIN_HOST "localhost:1337"

EXPOSE 1337
CMD /bin/bash -l -c 'npm start'
