public class Main {
    public static boolean isPalindrome(String str) {
        int len = str.length();
        for (int i = 0; i < len / 2; i++) {
            if (str.charAt(i) != str.charAt(len - i - 1)) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        if (args.length != 1) {
            System.err.println("Usage: java Main <string>");
            System.exit(1);
        }

        String inputStr = args[0];

        if (isPalindrome(inputStr)) {
            System.out.println( 1);
        } else {
            System.out.println(0);
        }
    }
}