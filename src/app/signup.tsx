import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { isValidPassword } from '@/utils/validation'
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

const SignUpSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'O nome deve ter pelo menos 2 caracteres.' }),
  email: z.email({ message: 'E-mail inválido.' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
})

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  function handleSignUp() {
    const result = SignUpSchema.safeParse({ name, email, password })

    if (!result.success) {
      Alert.alert(
        'Cadastrar',
        result.error.issues[0].message +
          ' Por favor, corrija e tente novamente.'
      )
      return
    }

    if (isValidPassword(password) === false) {
      Alert.alert('Cadastrar', 'A senha deve ter pelo menos 6 caracteres.')
      return
    }

    if (password !== confirmPassword) {
      Alert.alert('Cadastrar', 'As senhas não coincidem.')
      return
    }

    Alert.alert(
      'Bem-vindo',
      `Cadastro realizado com sucesso para o e-mail ${email}`
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
            source={require('@/assets/img2.jpg')}
            style={styles.illustration}
          />

          <Text style={styles.title}>Cadastrar</Text>
          <Text style={styles.subtitle}>Crie sua conta para acessar.</Text>

          <View style={styles.form}>
            <Input label="Nome" placeholder="Nome" onChangeText={setName} />
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
            <Input
              label="Confirmar Senha"
              placeholder="Confirmar Senha"
              secureTextEntry={true}
              onChangeText={setConfirmPassword}
            />
            <Button label="Cadastrar" onPress={handleSignUp} />
          </View>

          <Text style={styles.footerText}>
            Já tem uma conta?{' '}
            <Link href="/" style={styles.footerLink}>
              Entre aqui.
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
    marginBottom: 32,
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
