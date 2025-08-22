import { useRegister } from "@/api/hooks/useRegister";
import ButtonComponent from "@/components/Button/ButtonComponent";
import InputComponent from "@/components/Input/InputComponent";
import ScreenContainer from "@/components/ScreenContainer";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as yup from "yup";

export default function RegisterPage() {
  const colors = useThemeColors();
  const { mutate, isPending, isError, error } = useRegister();

  const registerSchema = yup.object().shape({
    nome: yup.string().min(2, "Nome deve ter pelo menos 2 caracteres").required("Nome é obrigatório"),
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    senha: yup.string().min(6, "Senha deve ter pelo menos 6 caracteres").required("Senha é obrigatória"),
    confirmarSenha: yup
      .string()
      .oneOf([yup.ref("senha")], "Senhas não coincidem")
      .required("Confirme sua senha"),
  });

  const handleRegister = (values: { nome: string; email: string; senha: string; confirmarSenha: string }) => {
    const { nome, email, senha } = values;
    mutate(
      { nome, email, senha },
      {
        onSuccess: (data) => {
          if (data && data.success !== false) {
            router.replace("/(tabs)");
          }
        },
        onError: (err: any) => {},
      },
    );
  };

  return (
    <ScreenContainer>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerSection}>
          <View style={[styles.logoCircle, { backgroundColor: colors.primary + "20" }]}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={[{ width: 64, height: 64, tintColor: colors.primary }]}
            />
          </View>
          <Text style={[styles.appName, { color: colors.primary }]}>Plannering</Text>
          <Text style={[styles.welcomeText, { color: colors.text }]}>Crie sua conta e comece a planejar</Text>
        </View>

        <Formik
          initialValues={{ nome: "", email: "", senha: "", confirmarSenha: "" }}
          onSubmit={handleRegister}
          validationSchema={registerSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <View style={styles.formSection}>
                <InputComponent
                  value={values.nome}
                  placeholder="Digite seu nome completo"
                  label="Nome"
                  onChangeText={handleChange("nome")}
                  onBlur={handleBlur("nome")}
                />
                {touched.nome && errors.nome && (
                  <Text style={{ color: colors.error, fontSize: 12 }}>{errors.nome}</Text>
                )}

                <InputComponent
                  value={values.email}
                  placeholder="Digite seu e-mail"
                  label="Email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  keyboardType="email-address"
                  autoCapitalize="none"
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
                  secureTextEntry
                />
                {touched.senha && errors.senha && (
                  <Text style={{ color: colors.error, fontSize: 12 }}>{errors.senha}</Text>
                )}

                <InputComponent
                  value={values.confirmarSenha}
                  placeholder="Confirme sua senha"
                  label="Confirmar Senha"
                  onChangeText={handleChange("confirmarSenha")}
                  onBlur={handleBlur("confirmarSenha")}
                  secureTextEntry
                />
                {touched.confirmarSenha && errors.confirmarSenha && (
                  <Text style={{ color: colors.error, fontSize: 12 }}>{errors.confirmarSenha}</Text>
                )}
              </View>
              {isError && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{error?.message || "Erro ao criar conta. Tente novamente."}</Text>
                </View>
              )}

              {/* Botões */}
              <View style={styles.buttonSection}>
                <ButtonComponent
                  title={isPending ? "Criando conta..." : "Criar conta"}
                  onPress={handleSubmit}
                  disabled={isPending}
                />
                <View style={styles.buttonSpacing} />
                <ButtonComponent
                  title="Já tenho uma conta"
                  variant="outline"
                  onPress={() => {
                    router.push("/auth/login");
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
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  switchLabel: {
    fontSize: 14,
    marginLeft: 6,
    opacity: 0.8,
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
    lineHeight: 16,
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
