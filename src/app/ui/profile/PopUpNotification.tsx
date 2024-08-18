'use client'

import axios from 'axios';
import { BellIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react";
import { toast } from "sonner";

type PopUpNotificationProps = {
  title: string;
  text: string;
}

export default function PopUpNotification({ title, text }: PopUpNotificationProps) {
	const [notificationPermission, setNotificationPermission] = useState<
		"granted" | "denied" | "default"
	>("default");
	const [ active, setActive ] = useState<boolean>(false);

  const showNotification = () => {
		if ("Notification" in window) {
			Notification.requestPermission().then((permission) => {
				setNotificationPermission(permission);
				if (permission === "granted") {
					subscribeUser();
				} else {
					toast.info(
						"please go to setting and enable noitificatoin."
					);
				}
			});
		} else {
			toast.info("This browser does not support notifications.");
		}
	};

  async function subscribeUser() {
		if ("serviceWorker" in navigator) {
			try {
				// Check if service worker is already registered
				const registration =
					await navigator.serviceWorker.getRegistration();
				if (registration) {
					generateSubscribeEndPoint(registration);
				} else {
					// Register the service worker
					const newRegistration =
						await navigator.serviceWorker.register("/sw.js");
					// Subscribe to push notifications
					generateSubscribeEndPoint(newRegistration);
				}
			} catch (error) {
				toast.error(
					"Error during service worker registration or subscription:"
				);
			}
		} else {
			toast.error("Service workers are not supported in this browser");
		}
	}

  const generateSubscribeEndPoint = async (
		newRegistration: ServiceWorkerRegistration
	) => {
		const applicationServerKey = urlB64ToUint8Array(
			process.env.NEXT_PUBLIC_VAPID_KEY!
		);
		const options = {
			applicationServerKey,
			userVisibleOnly: true, // This ensures the delivery of notifications that are visible to the user, eliminating silent notifications. (Mandatory in Chrome, and optional in Firefox)
		};
		const subscription = await newRegistration.pushManager.subscribe(
			options
		);

		try {
			const {data} = await axios.post('/api/save-subscription', { subscription });
		} catch (error: any) {
			toast.error(error.message);
		}

	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setActive(event.target.checked);
		event.target.checked && showNotification();
	}

  useEffect(() => {
		setNotificationPermission(Notification.permission);
		setActive(Notification.permission === "granted");
	}, []);

  return (
    <>
      <h3 className="text-lg font-semibold">{ title }</h3>
      <label className="btn btn-ghost w-full">
        <BellIcon className="size-5 text-primary" />
        <span className="label-text grow flex justify-start">{ text }</span>
				<input
					type="checkbox"
					className="toggle toggle-md toggle-secondary"
					onChange={handleChange}
					checked={active}
				/>
      </label>
    </>
  )
}

function urlB64ToUint8Array(base64String: string): Uint8Array {
	const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding)
		.replace(/\-/g, "+")
		.replace(/_/g, "/");
	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);
	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}