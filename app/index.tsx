import { AuthStorage } from "@/api/auth/storage";
import ButtonComponent from "@/components/Button/ButtonComponent";
import ScreenContainer from "@/components/ScreenContainer";
import { useThemeColors } from "@/hooks/useThemeColors";

import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function Homepage() {
  const colors = useThemeColors();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    checkAuthAndRedirect();
  }, []);

  const checkAuthAndRedirect = async () => {
    try {
      const isAuthenticated = await AuthStorage.isAuthenticated();

      if (isAuthenticated) {
        router.replace("/(tabs)");
      } else {
        setIsChecking(false);
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      setIsChecking(false);
    }
  };

  if (isChecking) {
    return (
      <ScreenContainer>
        <View style={[styles.container, styles.loadingContainer]}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={[styles.logoCircle, { backgroundColor: colors.primary + "20", alignItems: "center" }]}>
            <Image
              source={require("../assets/images/logo.png")}
              style={[styles.featureIcon, { width: 96, height: 96, tintColor: colors.text }]}
            />
          </View>
          <Text style={[styles.welcomeText, { color: colors.text }]}>Bem-vindo ao</Text>
          <Text style={[styles.appName, { color: colors.primary }]}>Plannering</Text>
          <Text style={[styles.tagline, { color: colors.text }]}>Organize sua rotina, conquiste seus objetivos!</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonSection}>
          <ButtonComponent title="Entrar" onPress={() => router.push("/auth/login")} />
          <View style={styles.buttonSpacing} />
          <ButtonComponent title="Criar conta" variant="outline" onPress={() => router.push("/auth/register")} />
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={[styles.featuresTitle, { color: colors.text }]}>
            Tudo que você precisa para organizar seus estudos
          </Text>

          <View style={styles.featureCard}>
            <View style={styles.featureCardContent}>
              <Image
                source={require("../assets/icons/task-management.png")}
                style={[styles.featureCardIcon, { tintColor: colors.primary }]}
              />
              <View style={styles.featureCardText}>
                <Text style={[styles.featureCardTitle, { color: colors.text }]}>Gerencie sua rotina</Text>
                <Text style={[styles.featureCardDescription, { color: colors.text }]}>
                  Organize tarefas, atividades e compromissos de forma simples
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureCardContent}>
              <Image
                source={require("../assets/icons/notifications.png")}
                style={[styles.featureCardIcon, { tintColor: colors.primary }]}
              />
              <View style={styles.featureCardText}>
                <Text style={[styles.featureCardTitle, { color: colors.text }]}>Lembretes inteligentes</Text>
                <Text style={[styles.featureCardDescription, { color: colors.text }]}>
                  Receba notificações no momento certo para não perder nada
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureCardContent}>
              <Image
                source={require("../assets/icons/progress.png")}
                style={[styles.featureCardIcon, { tintColor: colors.primary }]}
              />
              <View style={styles.featureCardText}>
                <Text style={[styles.featureCardTitle, { color: colors.text }]}>Acompanhe seu progresso</Text>
                <Text style={[styles.featureCardDescription, { color: colors.text }]}>
                  Visualize sua evolução e conquiste seus objetivos acadêmicos
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  logoIcon: {
    fontSize: 32,
  },
  welcomeText: {
    fontSize: 16,
    marginBottom: 2,
  },
  appName: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 8,
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 15,
    textAlign: "center",
    opacity: 0.8,
    lineHeight: 20,
    maxWidth: 260,
  },
  featuresSection: {
    flex: 1,
    marginVertical: 20,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
    opacity: 0.9,
  },
  featureCard: {
    marginBottom: 12,
    paddingHorizontal: 2,
  },
  featureCardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 10,
    backgroundColor: "rgba(0, 137, 139, 0.05)",
  },
  featureCardIcon: {
    width: 36,
    height: 36,
    marginRight: 14,
  },
  featureCardText: {
    flex: 1,
  },
  featureCardTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 3,
  },
  featureCardDescription: {
    fontSize: 13,
    opacity: 0.8,
    lineHeight: 18,
  },
  featureRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 14,
  },
  featureItem: {
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 8,
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    textAlign: "center",
    opacity: 0.9,
  },
  buttonSection: {
    paddingHorizontal: 4,
    marginBottom: 14,
  },
  buttonSpacing: {
    height: 12,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
