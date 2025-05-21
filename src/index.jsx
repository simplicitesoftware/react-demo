/*  ___ _            _ _    _ _
 * / __(_)_ __  _ __| (_)__(_) |_ ___
 * \__ \ | '  \| '_ \ | / _| |  _/ -_)
 * |___/_|_|_|_| .__/_|_\__|_|\__\___|
 *             |_|
 * This example is using the Simplicite node.js & browser JavaScript API
 */
import * as React from 'react'; // eslint-disable-line no-unused-vars
import * as ReactDOMClient from 'react-dom/client';
import Demo from './demo.jsx'; // eslint-disable-line no-unused-vars
import './index.css';

// Explicit URL needed for a standalone deployment, remove it when deploying in Simplicité
ReactDOMClient.createRoot(document.getElementById('react-demo-products')).render(<Demo url='https://demo.dev2.simplicite.io' username='website' password='simplicite'/>);
