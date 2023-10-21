"use client";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileDataSchema } from "@/utils/formSchema";
import styles from "./userform.module.scss"

type FormValues = {
    username: string;
    tier: string;
};

type idsProps = {
    _id:any;
    user:any;
};

const userRoleOptions = ["enterprise", "gold", "silver", "bronze"];

const UserForm: React.FC<idsProps> = ({_id, user}) => {

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<FormValues>({
        resolver: zodResolver(profileDataSchema),
      });

    // Pre-fill the form with user data if available
    const defaultValues = {
        username: user?.username || "",
        tier: user?.tier || "",
    };

    // send data to the "/api/orders" route
    const onSubmit = async (data: FormValues) => {
        try {
            const usernameWithPrefix = `@${data.username}`; // Add "@" prefix to username

            const userData  = {
                _id,
                username: usernameWithPrefix,
                tier: data.tier,
            }
            // console.log(userData);
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
              });
              console.log(userData);
              if (response.ok) {
                alert("User updated successfully!");
            } else {
                alert("Failed to update user.");
            }
        } catch (error) {
            console.error(error);
            alert("Failed to update user.");
        }
    }
    
    return (
        <section className={styles.admin}>
            <form className={styles.userform} onSubmit={handleSubmit(onSubmit)}>
                {/* <label htmlFor="tier">Tier:</label> */}
                <Controller
                name="tier"
                control={control}
                defaultValue={defaultValues.tier}
                render={({ field }) => (
                    <select {...field} id="tier">
                        {userRoleOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                    </select>
                )}
                />
                {errors.tier && <span className={styles.error}>{errors.tier.message}</span>}

                {/* <label htmlFor="username">Username:</label> */}
                <div className={styles.usernameWrapper}>
                    <span className={styles.prefix}>@</span>
                    <input 
                        {...register("username")} id="username" 
                        defaultValue={defaultValues.username.replace("@", "")} />
                </div>
                {errors.username && <span className={styles.error}>{errors.username.message}</span>}
                
                <button type="submit" value="submit" className={styles.submit}>
                    <span>Submit</span>
                </button>
            </form>
        </section>
    )
};

export default UserForm;


