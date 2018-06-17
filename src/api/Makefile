GEN_DIR = gen

default: dir
	protoc \
    --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
    --js_out=import_style=commonjs,binary:$(GEN_DIR) \
    --ts_out=service=true:$(GEN_DIR) \
    -I ./protobuf \
    protobuf/*.proto protobuf/**/*.proto protobuf/*/*/*.proto

dir:
	mkdir -p $(GEN_DIR)