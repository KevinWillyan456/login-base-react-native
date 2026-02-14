import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Link } from 'expo-router'
import { useState } from 'react'
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { z } from 'zod'

const SignInSchema = z.object({
  email: z.email({ message: 'E-mail inválido.' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
})

export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSignIn() {
    const result = SignInSchema.safeParse({ email, password })

    if (!result.success) {
      Alert.alert(
        'Entrar',
        result.error.issues[0].message +
          ' Por favor, corrija e tente novamente.'
      )
      return
    }

    Alert.alert(
      'Bem-vindo',
      `Login realizado com sucesso para o e-mail ${email}`
    )
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: 'padding', android: 'height' })}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Image
            source={require('@/assets/img1.jpg')}
            style={styles.illustration}
          />

          <Text style={styles.title}>Entrar</Text>
          <Text style={styles.subtitle}>
            Acesse sua conta com e-mail e senha.
          </Text>

          <View style={styles.form}>
            <Input
              label="E-mail"
              placeholder="E-mail"
              keyboardType="email-address"
              onChangeText={setEmail}
            />

            <Input
              label="Senha"
              placeholder="Senha"
              secureTextEntry={true}
              onChangeText={setPassword}
            />
            <Button label="Entrar" onPress={handleSignIn} />
          </View>

          <Text style={styles.footerText}>
            Não tem uma conta?{' '}
            <Link href="./signup" style={styles.footerLink}>
              Cadastre-se aqui.
            </Link>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
    padding: 32
  },
  illustration: {
    width: '100%',
    height: 330,
    resizeMode: 'cover',
    marginTop: 62,
    borderRadius: 8
  },
  title: {
    fontSize: 32,
    fontWeight: 900
  },
  subtitle: {
    fontSize: 16
  },
  form: { marginTop: 24, gap: 12 },
  footerText: {
    textAlign: 'center',
    marginTop: 24,
    color: '#585860'
  },
  footerLink: {
    color: '#4F6CF3',
    fontWeight: 700
  }
})
