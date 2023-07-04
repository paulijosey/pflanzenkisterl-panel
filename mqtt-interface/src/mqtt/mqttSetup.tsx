// useMqttSubscription.ts
import { useEffect, useState } from 'react';
import mqtt, { MqttClient } from 'mqtt/dist/mqtt.min';
import mqttConfig from './mqttConfig';

type MqttSubscription = {
    topic: string;
    handler: (message: string) => void;
};

type MqttPublish = (topic: string, payload: string) => void;

const MqttSubscription = (subscriptions: MqttSubscription[]) => {
    const [mqttClient, setMqttClient] = useState<MqttClient | null>(null);

    useEffect(() => {
        const client = mqtt.connect(mqttConfig.brokerUrl);
        setMqttClient(client);

        return () => {
            if (client) {
                client.end();
            }
        };
    }, []);

    useEffect(() => {
        if (mqttClient) {
            subscriptions.forEach(({ topic, handler }) => {
                mqttClient.subscribe(topic);
                mqttClient.on('message', (topic, message) => {
                    handler(message.toString());
                });
            });
        }

        return () => {
            if (mqttClient) {
                subscriptions.forEach(({ topic }) => {
                    mqttClient.unsubscribe(topic);
                });
            }
        };
    }, [mqttClient, subscriptions]);

    const publish: MqttPublish = (topic, payload) => {
        if (mqttClient) {
            mqttClient.publish(topic, payload);
        }
    };

    return {
        mqttClient,
        publish,
    };
};

export default MqttSubscription;
