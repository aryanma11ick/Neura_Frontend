"use client";

import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { Calendar, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  async function handleGoogleLogin() {
    try {
      setLoading(true);
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="border border-border/50 bg-card/70 backdrop-blur-md shadow-md">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Welcome to Neura
            </CardTitle>
            <p className="text-sm text-muted-foreground text-center">
              Sign in to view and manage your schedule
            </p>
          </CardHeader>

          <CardContent>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center justify-center space-y-5 mt-4"
            >
              <Button
                onClick={handleGoogleLogin}
                disabled={loading}
                size="lg"
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600"
              >
                {loading ? (
                  <span className="animate-pulse">Signing in...</span>
                ) : (
                  <>
                    <Calendar className="mr-2 w-5 h-5" />
                    Continue with Google
                  </>
                )}
              </Button>

              <div className="flex items-center justify-center w-full gap-2 text-muted-foreground text-sm">
                <span className="h-[1px] w-12 bg-border" />
                or
                <span className="h-[1px] w-12 bg-border" />
              </div>

              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => alert('WhatsApp login coming soon!')}
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                Continue with WhatsApp
              </Button>
            </motion.div>
          </CardContent>
        </Card>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-sm text-muted-foreground text-center mt-6"
        >
          By signing in, you agree to Neura’s{" "}
          <a href="/privacy" className="underline hover:text-foreground">
            Privacy Policy
          </a>
          .
        </motion.p>
      </motion.div>
    </div>
  );
}
