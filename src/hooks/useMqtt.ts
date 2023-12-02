import {useEffect, useState} from 'react';
import mqtt, {IClientOptions, MqttClient} from 'mqtt';

export const useMqtt = (topic: string): [string | null, (msg: string) => void] => {
    const [client, setClient] = useState<MqttClient | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const options: IClientOptions = {
            clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
        };
        const mqttClient: MqttClient = mqtt.connect(process.env.NEXT_PUBLIC_MQTT_URL || '', options);

        mqttClient.on('connect', () => {
            mqttClient.subscribe(topic, (err) => {
                if (!err) {
                    console.log(`Subscribed to ${topic}`);
                }
            });
        });

        mqttClient.on('message', (topic: string, mqttMessage: Buffer) => {
            setMessage(mqttMessage.toString());
        });

        setClient(mqttClient);

        return () => {
            mqttClient.end();
        }
    }, [topic]);

    const publishMessage = (msg: string) => {
        client?.publish(topic, msg);
    }

    return [message, publishMessage];
}
