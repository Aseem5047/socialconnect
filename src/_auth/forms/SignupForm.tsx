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
import { SignupValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import {
	useCreateUserAccount,
	useSignInAccount,
} from "@/lib/react-query/queries";
import { useUserContext } from "@/context/AuthContext";

const SignupForm = () => {
	const { toast } = useToast();
	const navigate = useNavigate();
	const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

	const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
		useCreateUserAccount();
	const { mutateAsync: signInAccount, isPending: isSigningIn } =
		useSignInAccount();

	// 1. Define your form.
	const form = useForm<z.infer<typeof SignupValidation>>({
		resolver: zodResolver(SignupValidation),
		defaultValues: {
			name: "",
			username: "",
			email: "",
			password: "",
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof SignupValidation>) {
		// createUser
		const newUser = await createUserAccount(values);

		if (!newUser) {
			return toast({
				title: "Registration Failed Please Try Again",
			});
		}

		const session = await signInAccount({
			email: values.email,
			password: values.password,
		});

		if (!session) {
			return toast({
				title: "Registration Failed Please Try Again",
			});
		}

		const isLoggedIn = await checkAuthUser();
		if (isLoggedIn) {
			form.reset();
			navigate("/");
		} else {
			toast({ title: "Registration Failed Please Try Again" });
		}
	}
	return (
		<Form {...form}>
			<div className="sm:w-420 flex-center flex-col">
				<img src="/assets/images/logo.png" alt="logo" />
				<h2 className="h3-bold md:h2-bold pt-5 sm:pt-8 ">
					Register a New Account
				</h2>
				<p className="text-light-3 small-medium md:base-regular mt-2">
					To use Connect please Enter your Details
				</p>

				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-5 w-full mt-4"
				>
					{/* Name */}
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										type="text"
										placeholder="Enter your Name"
										className="shad-input"
										{...field}
									/>
								</FormControl>
								{/* <FormDescription>Please Provide Your Good Name</FormDescription> */}
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Username */}
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input
										placeholder="Give yourself a Username"
										type="text"
										className="shad-input"
										{...field}
									/>
								</FormControl>
								{/* <FormDescription>
									Username will be your public name for others
								</FormDescription> */}
								<FormMessage />
							</FormItem>
						)}
					/>

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
						{isCreatingUser || isSigningIn || isUserLoading ? (
							<div className="flex-center gap-2 w-full">
								<Loader /> Loading ...
							</div>
						) : (
							"Register"
						)}
					</Button>

					<p className="text-small-regular text-light-2 text-center mt-2">
						Already have an account ?{" "}
						<Link
							to="/sign-in"
							className="text-primary-500 text-small-semibold ml-1 hoverEffectText"
						>
							Authenticate
						</Link>
					</p>
				</form>
			</div>
		</Form>
	);
};

export default SignupForm;
