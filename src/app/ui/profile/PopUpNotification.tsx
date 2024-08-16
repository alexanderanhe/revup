'use client'

import { BellIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Drawer } from "vaul";
import SubmitButton from "../utils/SubmitButton";

type PopUpNotificationProps = {
  title: string;
  text: string;
}

export default function PopUpNotification({ title, text }: PopUpNotificationProps) {
	const [notificationPermission, setNotificationPermission] = useState<
		"granted" | "denied" | "default"
	>("default");
	const [open, setOpen] = useState<boolean>(false);
	const [subscription, setSubscription] = useState<PushSubscription | null>();

  const showNotification = () => {
		if ("Notification" in window) {
			Notification.requestPermission().then((permission) => {
				setNotificationPermission(permission);
				// if (permission === "granted") {
				// 	subscribeUser();
				// } else {
				// 	toast.info(
				// 		"please go to setting and enable noitificatoin."
				// 	);
				// }
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
		setSubscription(subscription);
		//  TO DO: Save the subscription object to the database

		// example code
		// const supabase = createSupabaseBrowser();

		// const { error } = await supabase
		// 	.from("notification")
		// 	.insert({ notification_json: JSON.stringify(subscription) });

		// if (error) {
		// 	toast.error(error.message);
		// } else {
		// 	queryClient.invalidateQueries({ queryKey: ["user"] });
		// }
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.target.checked && showNotification()
	}

	useEffect(() => {
		if (notificationPermission === "granted") {
			subscribeUser();
		} else if (notificationPermission === "denied") {
			toast.info(
				"please go to setting and enable notification."
			);
		}
	}, [notificationPermission]);

	useEffect(() => {
		if (subscription) {
			setOpen(true);
		}
	}, [subscription]);

  useEffect(() => {
		setNotificationPermission(Notification.permission);
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
          checked={notificationPermission === "granted"}
        />
				<Drawer.Root
					open={open}
					onOpenChange={setOpen}
					// snapPoints={["148px"]}
					// setActiveSnapPoint={"148px"}
					shouldScaleBackground
				>
					<Drawer.Overlay className="fixed inset-0 bg-black/80" />
					<Drawer.Portal>
						<Drawer.Content className="fixed flex flex-col bg-base-100 border border-base-300 border-b-none rounded-t-[10px] bottom-0 left-0 right-0 h-full max-h-[97%] mx-[-1px] z-30">
							<div className="flex-none mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-base-300 mb-6 mt-4" />
							<div className="flex flex-col max-w-md mx-auto w-full p-4 pt-5 space-y-2">
								<form action="">
									<SubmitButton className="btn w-full">Subscribe</SubmitButton>
								</form>
							</div>
						</Drawer.Content>
					</Drawer.Portal>
				</Drawer.Root>
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