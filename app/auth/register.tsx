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

  const useSchema = yup.object().shape({
    name: yup
      .string()
      .max(60, "Nome deve ter no máximo 60 caracteres")
      .min(10, "Nome deve ter no mínimo 10 caracteres")
      .required("Nome é obrigatório")
      .matches(/^[^\d]+$/, "O nome não pode conter números"),
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    password: yup.string().min(6, "Senha deve ter pelo menos 6 caracteres").required("Senha é obrigatória"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), undefined], "As senhas devem coincidir"),
  });

  const handleSubmit = (values: { name: string; email: string; password: string; confirmPassword: string }) => {
    console.log("Form values:", values);
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
          <Text style={[styles.welcomeText, { color: colors.text }]}>Faça login para acessar sua conta</Text>
        </View>

        <Formik
          initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
          onSubmit={handleSubmit}
          validationSchema={useSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <>
              <View style={styles.formSection}>
                <InputComponent
                  value={values.name}
                  placeholder="Digite seu nome"
                  label="Nome"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                />
                {errors.name && <Text style={{ color: colors.error, fontSize: 12 }}>{errors.name}</Text>}
                <InputComponent
                  value={values.email}
                  placeholder="Digite seu e-mail"
                  label="Email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                />
                {errors.email && <Text style={{ color: colors.error, fontSize: 12 }}>{errors.email}</Text>}
                <InputComponent
                  value={values.password}
                  placeholder="Digite sua senha"
                  label="Senha"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                />
                {errors.password && <Text style={{ color: colors.error, fontSize: 12 }}>{errors.password}</Text>}
                <InputComponent
                  value={values.confirmPassword}
                  placeholder="Confirme sua senha"
                  label="Confirmar senha"
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <Text style={{ color: colors.error, fontSize: 12 }}>{errors.confirmPassword}</Text>
                )}
              </View>

              {/* Botões */}
              <View style={styles.buttonSection}>
                <ButtonComponent title="Criar conta" onPress={handleSubmit} />
                <View style={styles.buttonSpacing} />
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                  <Text>Já possui uma conta?</Text>
                  <ButtonComponent
                    title="Entrar agora mesmo"
                    variant="link"
                    onPress={() => {
                      router.push("/auth/login");
                    }}
                  />
                </View>
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
  },
});
