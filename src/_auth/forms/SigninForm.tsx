import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SigninValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useSignInAccount } from "@/lib/react-query/queries";
import { useUserContext } from "@/context/AuthContext";

const SignInForm = () => {
	const { toast } = useToast();
	const navigate = useNavigate();
	const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

	const { mutateAsync: signInAccount, isPending: isSigningIn } =
		useSignInAccount();

	// 1. Define your form.
	const form = useForm<z.infer<typeof SigninValidation>>({
		resolver: zodResolver(SigninValidation),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof SigninValidation>) {
		// createUser

		const session = await signInAccount({
			email: values.email,
			password: values.password,
		});

		if (!session) {
			return toast({
				title: "Authentication Failed Please Try Again",
			});
		}

		const isLoggedIn = await checkAuthUser();
		if (isLoggedIn) {
			form.reset();
			navigate("/");
		} else {
			toast({ title: "Authentication Failed Please Try Again" });
		}
	}
	return (
		<Form {...form}>
			<div className="sm:w-420 flex-center flex-col my-auto">
				<img
					src="/assets/images/logox.png"
					alt="logo"
					className="w-16 h-16 object-cover rounded-xl"
				/>{" "}
				<h2 className="h3-bold md:h2-bold pt-5 sm:pt-8 ">
					Authenticate Your Account
				</h2>
				<p className="text-light-3 small-medium md:base-regular mt-2">
					Glad to have You Back Please Authenticate
				</p>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-5 w-full mt-4"
				>
					{/* Email */}
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										type="email"
										placeholder="Provide Email Address"
										className="shad-input"
										{...field}
									/>
								</FormControl>
								{/* <FormDescription>Please Provide a Valid Email</FormDescription> */}
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Password */}
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										type="password"
										placeholder="Provide Email Address"
										className="shad-input"
										autoComplete="off"
										{...field}
									/>
								</FormControl>
								{/* <FormDescription>
									We recommend to set a Strong Password
								</FormDescription> */}
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="shad-button_primary">
						{isSigningIn || isUserLoading ? (
							<div className="flex-center gap-2 w-full">
								<Loader /> Loading ...
							</div>
						) : (
							"Authenticate"
						)}
					</Button>

					<p className="text-small-regular text-light-2 text-center mt-2">
						Don't have an account ?{" "}
						<Link
							to="/sign-up"
							className="text-primary-500 text-small-semibold ml-1 hoverEffectText"
						>
							Register
						</Link>
					</p>
				</form>
			</div>
		</Form>
	);
};

export default SignInForm;
