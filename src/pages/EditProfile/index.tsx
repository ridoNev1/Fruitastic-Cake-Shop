import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// Validasi dengan Zod
const editProfileSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter."),
  email: z.string().email("Format email tidak valid."),
  phone_number: z.string().min(10, "Nomor telepon minimal 10 karakter."),
  address_line: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  postal_code: z.string().optional(),
});

type EditProfileFormSchema = z.infer<typeof editProfileSchema>;

export default function EditProfilePage() {
  const { user, updateProfile, isLoading } = useAuthStore();

  const form = useForm<EditProfileFormSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      address_line: "",
      city: "",
      province: "",
      postal_code: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        address_line: user.address_line || "",
        city: user.city || "",
        province: user.province || "",
        postal_code: user.postal_code || "",
      });
    }
  }, [user, form]);

  const onSubmit = async (values: EditProfileFormSchema) => {
    try {
      await updateProfile(values);
      toast.success("Profil berhasil diperbarui!");
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "Gagal memperbarui profil"
        : "Terjadi kesalahan saat memperbarui profil";
      toast.error(message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto items-start px-6 grid grid-cols-2 gap-8 py-28">
      <Card>
        <CardHeader>
          <CardTitle>Informasi Profil</CardTitle>
          <CardDescription>
            Perbarui informasi pribadi Anda di sini.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {[
                ["name", "Nama Lengkap", "John Doe"],
                ["email", "Email", "name@example.com"],
                ["phone_number", "Nomor Telepon", "08123456789"],
              ].map(([field, label, placeholder]) => (
                <FormField
                  key={field}
                  control={form.control}
                  name={field as keyof EditProfileFormSchema}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <FormControl>
                        <Input placeholder={placeholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              <CardFooter className="px-0">
                <Button type="submit" className="ml-auto" disabled={isLoading}>
                  {isLoading && <Loader2 className="animate-spin w-4 h-4" />}
                  Simpan Perubahan
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Informasi Alamat</CardTitle>
          <CardDescription>
            Perbarui informasi Alamat Anda di sini.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {[
                ["address_line", "Alamat Lengkap", "Jl. Mawar No. 123"],
                ["city", "Kota", "Jakarta"],
                ["province", "Provinsi", "DKI Jakarta"],
                ["postal_code", "Kode Pos", "12345"],
              ].map(([field, label, placeholder]) => (
                <FormField
                  key={field}
                  control={form.control}
                  name={field as keyof EditProfileFormSchema}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <FormControl>
                        <Input placeholder={placeholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              <CardFooter className="px-0">
                <Button type="submit" className="ml-auto" disabled={isLoading}>
                  {isLoading && <Loader2 className="animate-spin w-4 h-4" />}
                  Simpan Perubahan
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
