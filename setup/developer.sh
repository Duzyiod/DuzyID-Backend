# Server setup settings
NETWORK="duzyid"
APP_NAME="duzyid.backend"
CONTAINER_NAME="duzyid.backend"

# Prepare environment
docker stop $(docker ps -a -f "name=$CONTAINER_NAME" -q)
docker rm -f $(docker ps -a -f "name=$CONTAINER_NAME" -q)
docker rmi $(docker images $APP_NAME -a -q)

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

# Docker setup
docker build \
    -t $APP_NAME \
    --build-arg ENV=$ENV \
    --network $NETWORK \
    -f $SOURCE_PATH/Dockerfile \
    $SOURCE_PATH

# Docker run
docker run --restart always \
    -d \
    --env-file=.env \
    --network $NETWORK \
    --name=$CONTAINER_NAME \
    --publish 3004:3004 \
    $APP_NAME
