import { useLogin } from "@/api/hooks/useLogin";
import ButtonComponent from "@/components/Button/ButtonComponent";
import CheckboxComponent from "@/components/CheckboxComponent";
import InputComponent from "@/components/Input/InputComponent";
import LoadingComponent from "@/components/LoadingComponent";
import LogoComponent from "@/components/LogoComponent";
import ScreenContainer from "@/components/ScreenContainer";
import { useAuthContext } from "@/contexts/AuthContext";
import { useThemeColors } from "@/hooks/useThemeColors";
import { router } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as yup from "yup";

export default function LoginPage() {
  const [keepConnected, setKeepConnected] = React.useState(false);
  const colors = useThemeColors();
  const { mutate, isPending, isError, error } = useLogin();
  const { isAuthenticated } = useAuthContext();

  React.useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(tabs)");
    }
  }, [isAuthenticated]);

  const loginSchema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    senha: yup.string().min(6, "Senha deve ter pelo menos 6 caracteres").required("Senha é obrigatória"),
  });

  const handleLogin = (values: { email: string; senha: string }) => {
    mutate({ ...values, saveRefreshToken: keepConnected });
  };

  if (isPending) {
    return (
      <ScreenContainer>
        <View style={styles.container}>
          <LoadingComponent />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerSection}>
          <View>
            <LogoComponent />
          </View>
          <Text style={[styles.appName, { color: colors.primary }]}>Plannering</Text>
          <Text style={[styles.welcomeText, { color: colors.text }]}>Faça login para acessar sua conta</Text>
        </View>

        {/* Formulário com Formik */}
        <Formik initialValues={{ email: "", senha: "" }} validationSchema={loginSchema} onSubmit={handleLogin}>
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <View style={styles.formSection}>
                <InputComponent
                  value={values.email}
                  placeholder="Digite seu e-mail"
                  label="Email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                />
                {touched.email && errors.email && (
                  <Text style={{ color: colors.error, fontSize: 12 }}>{errors.email}</Text>
                )}
                <InputComponent
                  value={values.senha}
                  placeholder="Digite sua senha"
                  label="Senha"
                  onChangeText={handleChange("senha")}
                  onBlur={handleBlur("senha")}
                />
                {touched.senha && errors.senha && (
                  <Text style={{ color: colors.error, fontSize: 12 }}>{errors.senha}</Text>
                )}
              </View>

              {/* Erro da API - Separado dos campos */}
              {isError && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>
                    {error?.message || "Email ou senha incorretos. Tente novamente."}
                  </Text>
                </View>
              )}

              <View style={styles.optionsRow}>
                <CheckboxComponent value={keepConnected} onValueChange={setKeepConnected} label="Manter-se conectado" />
                <ButtonComponent title="Esqueceu sua senha?" variant="link" onPress={() => router.push("/(tabs)")} />
              </View>

              {/* Botões */}
              <View style={styles.buttonSection}>
                <ButtonComponent
                  title={isPending ? "Entrando..." : "Entrar"}
                  onPress={handleSubmit}
                  disabled={isPending}
                />
                <View style={styles.buttonSpacing} />
                <ButtonComponent
                  title="Cadastre-se"
                  variant="outline"
                  onPress={() => {
                    router.push("/auth/register");
                  }}
                />
              </View>
            </>
          )}
        </Formik>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.secondary }]}>Plannering 2025</Text>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  optionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
    gap: 8,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 4,
    letterSpacing: -1,
  },
  welcomeText: {
    fontSize: 16,
    marginBottom: 2,
    opacity: 0.8,
    textAlign: "center",
  },
  formSection: {
    marginBottom: 24,
    gap: 12,
  },
  buttonSection: {
    marginBottom: 24,
  },
  buttonSpacing: {
    height: 12,
  },
  footer: {
    alignItems: "center",
    marginTop: 32,
    paddingBottom: 10,
  },
  footerText: {
    fontSize: 12,
    textAlign: "center",
    opacity: 0.6,
  },
  errorContainer: {
    backgroundColor: "rgba(255, 0, 0, 0.1)",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#ff0000",
  },
  errorText: {
    color: "#ff0000",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },
});
