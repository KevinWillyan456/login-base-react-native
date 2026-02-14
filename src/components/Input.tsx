import {
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  View
} from 'react-native'

type InputProps = TextInputProps & {
  label?: string
}

export function Input({ label, ...props }: InputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput {...props} style={styles.input} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderRadius: 8,
    fontSize: 16,
    paddingHorizontal: 12
  }
})
