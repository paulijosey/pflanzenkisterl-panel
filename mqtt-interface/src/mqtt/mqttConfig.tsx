const mqttConfig = {
    brokerUrl: 'ws://localhost:8080', // Replace with your MQTT broker URL
    pumpStatusTopic: '/pflanzenkisterl/controllers/pump/state',
    ledStatusTopic: '/pflanzenkisterl/controllers/leds/state',
    pumpPowerControlTopic: '/pflanzenkisterl/controllers/pump/set_power',
    ledPowerControlTopic: '/pflanzenkisterl/controllers/leds/set_power',
  };
  
  export default mqttConfig;
  