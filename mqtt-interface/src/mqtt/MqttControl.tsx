// MqttControl.tsx
import React, { useState } from 'react';
import MqttSubscription from './mqttSetup';
import mqttConfig from './mqttConfig';

const MqttControl: React.FC = () => {
    const [pumpStatus, setPumpStatus] = useState<boolean | null>(null);
    const [ledStatus, setLedStatus] = useState<boolean | null>(null);

    const { brokerUrl, pumpStatusTopic, ledStatusTopic, pumpPowerControlTopic, ledPowerControlTopic } = mqttConfig;

    const MqttPump = MqttSubscription(
        [
            {
                topic: pumpStatusTopic,
                handler: (message) => {
                    const msg = JSON.parse(message);
                    setPumpStatus(msg.Power);
                },
            },
        ]
    );

    const MqttLed = MqttSubscription(
        [
            {
                topic: ledStatusTopic,
                handler: (message) => {
                    const msg = JSON.parse(message);
                    setLedStatus(msg.Power);
                },
            },
        ]
    );

    const togglePump = () => {
        const newPumpStatus = !pumpStatus;
        setPumpStatus(newPumpStatus);
        MqttPump.publish(pumpPowerControlTopic, JSON.stringify({ 'power' : newPumpStatus }));
    };

    const toggleLed = () => {
        const newLedStatus = !ledStatus;
        setLedStatus(newLedStatus);
        MqttLed.publish(ledPowerControlTopic, JSON.stringify({ 'power' : newLedStatus }));
    };

    return (
        <div>
            <h2>Control</h2>
            <div>
                <h3>Pump</h3>
                <p>Status: {pumpStatus === null ? 'Loading...' : (pumpStatus ? 'On' : 'Off')}</p>
                <button onClick={togglePump}>{pumpStatus ? 'Turn Off' : 'Turn On'}</button>
            </div>
            <div>
                <h3>LED</h3>
                <p>Status: {ledStatus === null ? 'Loading...' : (ledStatus ? 'On' : 'Off')}</p>
                <button onClick={toggleLed}>{ledStatus ? 'Turn Off' : 'Turn On'}</button>
            </div>
        </div>
    );
};

export default MqttControl;
