FROM node:17-bullseye-slim

WORKDIR /app

COPY *.sh ./

RUN apt-get update && apt-get -y upgrade \
	&& apt-get install -y git build-essential openjdk-11-jdk maven python3 \
	&& npm install --unsafe-perm -g node-sass serve

RUN git config --global pull.rebase false \
    # && git clone https://github.com/bThink-BGU/BPjs-React-IDE.git \
	&& git clone https://github.com/AlmogZhivov/BPjs-React-IDE-master.git \
	&& cd BPjs-React-IDE-master \
	&& npm install --production \
	&& npm run build \
	&& cd .. \
	# && git clone https://github.com/bThink-BGU/BPjs-Debugger.git \
	&& git clone https://github.com/AlmogZhivov/Debugger.git \
	&& cd Debugger \
	&& mvn install -DskipTests 

EXPOSE 80
EXPOSE 8080

# Run the application
CMD ls -al ; ./run.sh