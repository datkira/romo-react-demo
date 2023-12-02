### Install
```bash
npm install
```

### Build
```bash
npm run build
```

### Run
```bash
npm start
```

### Topic MQTT
- `login`: client will send username and password (JSON)
- `login/success`: listen to this topic to get login result, just having value => login success
- `login/failed`: listen to this topic to get login result, just having value => login fail
