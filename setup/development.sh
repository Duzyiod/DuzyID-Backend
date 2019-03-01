# Server setup settings
NETWORK="duzyid"
APP_NAME="duzyid.backend"
CONTAINER_NAME="duzyid.backend"
VOLUME="duzyid.tmp-store"

# apply environment
ENV="${1}"
if [[ "${ENV}" == "" ]]; then
    ENV="production"
fi
DPATH="${2}"
if [[ "${DPATH}" == "" ]]; then
    DPATH="./"
fi

SOURCE_PATH="$(cd ${DPATH} && pwd)"

# verify if .env exists
FILE="${SOURCE_PATH}/.env"
if [ ! -f $FILE ]; then
    >&2 echo ".env required to exists"
    exit 1
fi

# Create Volume
docker volume create $VOLUME

# Prepare Image
docker rmi $(docker images $APP_NAME -a -q)

# Image Setup
docker build \
    -t $APP_NAME \
    --build-arg ENV=$ENV \
    --network $NETWORK \
    -f $SOURCE_PATH/Dockerfile \
    $SOURCE_PATH

# Prepare Container
docker stop $(docker ps -a -f "name=$CONTAINER_NAME" -q)
docker rm -f $(docker ps -a -f "name=$CONTAINER_NAME" -q)

# Run Container
docker run --restart always \
    -d \
    --env-file=.env \
    --network $NETWORK \
    --volume $VOLUME:/data \
    --name=$CONTAINER_NAME \
    --publish 3004:3004 \
    $APP_NAME
